select
  table_schema,
  table_name
from information_schema.tables
where table_schema = 'public'
  and table_type = 'BASE TABLE'
order by table_name;

select
  'stocks' as expected_table,
  to_regclass('public.stocks') is not null as exists
union all select 'user_investor_profiles', to_regclass('public.user_investor_profiles') is not null
union all select 'portfolio_connections', to_regclass('public.portfolio_connections') is not null
union all select 'personalized_recommendations', to_regclass('public.personalized_recommendations') is not null
union all select 'learning_events', to_regclass('public.learning_events') is not null
union all select 'evaluation_runs', to_regclass('public.evaluation_runs') is not null
union all select 'personalization_model_updates', to_regclass('public.personalization_model_updates') is not null
union all select 'active_app_states', to_regclass('public.active_app_states') is not null
union all select 'source_registry', to_regclass('public.source_registry') is not null
union all select 'ingestion_runs', to_regclass('public.ingestion_runs') is not null
union all select 'raw_source_events', to_regclass('public.raw_source_events') is not null
union all select 'source_documents', to_regclass('public.source_documents') is not null
union all select 'extracted_market_signals', to_regclass('public.extracted_market_signals') is not null
union all select 'signal_trace_links', to_regclass('public.signal_trace_links') is not null
union all select 'active_state_update_traces', to_regclass('public.active_state_update_traces') is not null;
