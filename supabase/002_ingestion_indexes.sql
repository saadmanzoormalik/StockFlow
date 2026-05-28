create unique index if not exists raw_source_events_provider_event_id_idx
on raw_source_events(provider_event_id);

create unique index if not exists source_documents_document_key_idx
on source_documents(document_key);

create unique index if not exists extracted_market_signals_signal_key_idx
on extracted_market_signals(signal_key);

create index if not exists ingestion_runs_source_status_started_idx
on ingestion_runs(source_id, status, started_at desc);

create index if not exists raw_source_events_source_event_timestamp_idx
on raw_source_events(source_id, event_timestamp desc);

create index if not exists extracted_market_signals_category_confidence_idx
on extracted_market_signals(signal_category, confidence desc);

create index if not exists signal_trace_links_target_idx
on signal_trace_links(target_table, target_record_key);
