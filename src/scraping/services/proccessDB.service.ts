import { Singleton } from './dbConection.service';
import { IProccessDBModelService } from '../models/proccessDB.model';

export class ProccessDB implements IProccessDBModelService {
  // ------------------
  // feature_depto - 01
  // ------------------

  // ----------------------------
  // remove duplicates rows - 1.1
  // ----------------------------
  async postFnCleansingFeatureDepto() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop trigger if exists tr_cleansing_feature_depto on public.feature_depto;
      drop function if exists public.fn_cleansing_feature_depto;
      create function public.fn_cleansing_feature_depto()
      returns trigger
      language plpgsql
      as $$
      declare arrData int[];
      begin
        -- get quantity data and max id for future cleansing
        arrData := (
          select ARRAY[count(id), max(id)]
          from public.feature_depto
          where id_data_estate = new.id_data_estate
          and m2_total = new.m2_total
          and m2_cubierta = new.m2_cubierta
          and ambiente = new.ambiente
          and banio = new.banio
          and dormitorio = new.dormitorio
          and antiguedad = new.antiguedad
          and disposicion = new.disposicion
          and orientacion = new.orientacion
          and cochera = new.cochera
        );
      
        -- if exists duplicate data, delete row
        if arrData[1] > 1 then
          delete from public.feature_depto where id = arrData[2];
        end if;
        return null;
      end
      $$;
    `);
  }

  // ---------------------------------
  // trigger for duplicates rows - 1.2
  // ---------------------------------
  async postTrCleansingFeatureDepto() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop trigger if exists tr_cleansing_feature_depto on public.feature_depto;
      create trigger tr_cleansing_feature_depto
      after insert
      on public.feature_depto
      for each row
      execute procedure public.fn_cleansing_feature_depto();
    `);
  }

  // ----------------
  // geolocation - 02
  // ----------------

  // ----------------------------
  // remove duplicates rows - 2.1
  // ----------------------------
  async postFnCleansingGeolocation() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop trigger if exists tr_cleansing_geolocation on public.geolocation;
      drop function if exists public.fn_cleansing_geolocation;
      create function public.fn_cleansing_geolocation()
      returns trigger
      language plpgsql
      as $$
      declare arrData int[];
      begin
        -- get quantity data and max id for future cleansing
        arrData := (
          select ARRAY[count(id), max(id)]
          from public.geolocation
          where id_data_estate = new.id_data_estate
          and latitude = new.latitude
          and longitude = new.longitude
        );

        -- if exists duplicate data, delete row
        if arrData[1] > 1 then 
          delete from public.geolocation where id = arrData[2];
        end if;
        return null;
      end
      $$;
    `);
  }

  // ---------------------------------
  // trigger for duplicates rows - 2.2
  // ---------------------------------
  async postTrCleansingGeolocation() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop trigger if exists tr_cleansing_geolocation on public.geolocation;
      create trigger tr_cleansing_geolocation
      after insert
      on public.geolocation
      for each row
      execute procedure public.fn_cleansing_geolocation();
    `);
  }

  // ----------------
  // data_estate - 03
  // ----------------
  // ------------------------------------------------
  // -- generate array with specific index data - 3.1
  // ------------------------------------------------
  async postFnArraySetElement() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop function if exists public.array_set_element;
      create function public.array_set_element(arr text[], elem text, idx int)
      returns text[]
      language plpgsql
      as $$
      begin
          if cardinality(arr) < idx then
              arr:= arr || array_fill(null::text, array[idx - cardinality(arr)]);
          end if;
          arr[idx]:= elem;
          return arr;
      end $$;
    `);
  }

  // --------------------------------------------------
  // -- multiple proccesses for data_estate table - 3.2
  // --------------------------------------------------
  async postFnProcessesDataEstate() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop trigger if exists tr_processes_data_estate on public.data_estate;
      drop function if exists public.fn_processes_data_estate;
      create function public.fn_processes_data_estate()
      returns trigger
      language plpgsql
      as $$
      declare arrData int[];
              arrFeature varchar[];
              value varchar;
              arrValue varchar[];
      begin
        -- get quantity data and max id for future cleansing
        arrData := (
          select ARRAY[count(id), max(id)]
          from public.data_estate
          where price = new.price
          and expense = new.expense
          and published = new.published
          and view = new.view
          and address = new.address
          and feature_depto = new.feature_depto
          and feature_general = new.feature_general
          and link_map = new.link_map
          and link_depto = new.link_depto
          and link_base = new.link_base
        );

        -- if exists duplicate data, delete row
        if arrData[1] > 1 then 
          delete from public.data_estate where id = arrData[2];
        end if;

        --------------------------------------------------
        -- bulk data into tables from public.data_estate -
        --------------------------------------------------

        ----------------
        -- geolocation -
        ----------------
        -- insert data into geolocation if not duplicate row in data_estate
        insert into public.geolocation (id_data_estate, latitude, longitude)
        with aux as (
          select	substring(
            split_part(
              split_part(new.link_map, 'center', 2), -- output: [=-34.567408400000000,-58.490232799999990&zo...]
            '&', 1), -- output: [=-34.567408400000000,-58.490232799999990]
            2
          ) as base -- output: [-34.567408400000000,-58.490232799999990]
        )
        select
          new.id,
          split_part(base, ',', 1) as latitude,
          split_part(base, ',', 2) as longitude
        from aux
        where exists (select 1 from public.data_estate where id = new.id);

        ------------------
        -- feature_depto -
        ------------------
        -- get array data
        arrFeature := new.feature_depto;

        -- insert element for element and generate array with specific index data (respected order of table previous created)
        foreach value in array arrFeature loop
          if lower(value) like '%total%' then
            value := split_part(value, ' ', 1);
            arrValue := public.array_set_element(arrValue, value, 1);
          end if;

          if lower(value) like '%cubierta%' then
            value := split_part(value, ' ', 1);
            arrValue := public.array_set_element(arrValue, value, 2);
          end if;

          if lower(value) like '%ambiente%' then
            value := split_part(value, ' ', 1);
            arrValue := public.array_set_element(arrValue, value, 3);
          end if;

          if lower(value) like '%baño%' then
            value := split_part(value, ' ', 1);
            arrValue := public.array_set_element(arrValue, value, 4);
          end if;

          if lower(value) like '%dormitorio%' then
            value := split_part(value, ' ', 1);
            arrValue := public.array_set_element(arrValue, value, 5);
          end if;

          if lower(value) like '%antigüedad%' then
            value := split_part(value, ' ', 1);
            arrValue := public.array_set_element(arrValue, value, 6);
          end if;

          if lower(value) in('a estrenar', 'en construcción') then
            arrValue := public.array_set_element(arrValue, '0', 6);
          end if;

          if lower(value) in('contrafrente', 'frente', 'lateral', 'interno') then
            arrValue := public.array_set_element(arrValue, value, 7);
          end if;

          if lower(value) in('n', 'ne', 'e', 'se', 's', 'so', 'o', 'no') then
            arrValue := public.array_set_element(arrValue, value, 8);
          end if;

          if lower(value) like '%cochera%' then
            value := split_part(value, ' ', 1);
            arrValue := public.array_set_element(arrValue, value, 9);
          end if;
        end loop;

        -- inset data into public.feature_depto
        insert into public.feature_depto (id_data_estate, m2_total, m2_cubierta, ambiente, banio, dormitorio, antiguedad, disposicion, orientacion, cochera)
        with aux as (
          select
            new.id as id_data_estate,
            cast(arrValue[1] as int) as m2_total,
            cast(arrValue[2] as int) as m2_cubierta,
            cast(arrValue[3] as int) as ambiente,
            cast(arrValue[4] as int) as banio,
            cast(arrValue[5] as int) as dormitorio,
            cast(arrValue[6] as int) as antiguedad,
            arrValue[7] as disposicion,
            arrValue[8] as orientacion,
            cast(arrValue[9] as int) as cochera
        )
        select *
        from aux
        where exists (select 1 from public.data_estate where id = id_data_estate);

        return null;
      end
      $$;
    `);
  }

  // --------------------------------
  // -- trigger for data estate - 3.3
  // --------------------------------
  async postTrProcessesDataEstate() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop trigger if exists tr_processes_data_estate on public.data_estate;
      create trigger tr_processes_data_estate
      after insert
      on public.data_estate
      for each row
      execute procedure public.fn_processes_data_estate();
    `);
  }

  // ---------------------------------
  // -- get price value and type - 3.4
  // ---------------------------------
  async postFnPrice() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop view if exists public.vw_full_data;
      drop function if exists public.fn_price;
      create function public.fn_price(p_type text, p_price text)
      returns varchar
      language plpgsql
      as $$
      declare msg varchar;
      /*
      value format: $ #.### / USD #.###
      output expected
        . currency: $ / USD
        . value: ####
      */
      begin
        case p_type
          when 'currency' then
            msg := split_part(p_price, ' ', 1);
          when 'value' then
            msg := replace(split_part(p_price, ' ', 2),'.', ''); 
          else
            msg := p_price;
        end case;
        return msg;
      end
      $$;
    `);
  }

  async postVwFullData() {
    const dataSource = await Singleton.getInstance();
    await dataSource.query(/*sql*/ `
      drop view if exists public.vw_full_data;
      create view public.vw_full_data as 
      select distinct
        a.id,
        a.create_dttm,
        public.fn_price('currency', a.price) as currency_price,
        cast(public.fn_price('value', a.price) as decimal) as price,
        public.fn_price('currency', a.expense) as currency_expense,
        cast(public.fn_price('value', a.expense) as decimal) as expense,
        cast(split_part(a.view, ' ', 1) as decimal) qty_views,
        a.feature_general,
        b.m2_total,
        b.m2_cubierta,
        b.ambiente,
        b.banio,
        b.dormitorio,
        b.antiguedad,
        b.disposicion,
        b.orientacion,
        b.cochera,
        c.latitude,
        c.longitude
      from public.data_estate a join public.feature_depto b on (a.id = b.id_data_estate)
                                join public.geolocation c on (a.id = c.id_data_estate)
      ;
    `);
  }
}
