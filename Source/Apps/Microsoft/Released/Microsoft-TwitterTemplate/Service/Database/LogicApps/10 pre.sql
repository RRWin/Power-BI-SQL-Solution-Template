SET ANSI_NULLS              ON;
SET ANSI_PADDING            ON;
SET ANSI_WARNINGS           ON;
SET ANSI_NULL_DFLT_ON       ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET QUOTED_IDENTIFIER       ON;
go

-- Must be executed inside the target database
-- Views

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_hashtag_slicer' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_hashtag_slicer;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_entity_graph' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_entity_graph;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_mention_slicer' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_mention_slicer;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_authorhashtag_graph' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_authorhashtag_graph;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_authormention_graph' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_authormention_graph;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_entities2' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_entities2;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_entities' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_entities;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_tweets_normalized' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_tweets_normalized;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_tweets_processed' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_tweets_processed;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_date' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_date;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='vw_configuration' AND TABLE_TYPE='VIEW')
    DROP VIEW pbist_twitter.vw_configuration;

-- Tables
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='hashtag_slicer' AND TABLE_TYPE='BASE TABLE')
	DROP TABLE pbist_twitter.hashtag_slicer;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='entity_graph' AND TABLE_TYPE='BASE TABLE')
	DROP TABLE pbist_twitter.entity_graph;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='mention_slicer' AND TABLE_TYPE='BASE TABLE')
	DROP TABLE pbist_twitter.mention_slicer;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='authorhashtag_graph' AND TABLE_TYPE='BASE TABLE')
	DROP TABLE pbist_twitter.authorhashtag_graph;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='authormention_graph' AND TABLE_TYPE='BASE TABLE')
	DROP TABLE pbist_twitter.authormention_graph;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='entities2' AND TABLE_TYPE='BASE TABLE')
    DROP TABLE pbist_twitter.entities2;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='entities' AND TABLE_TYPE='BASE TABLE')
	DROP TABLE pbist_twitter.entities;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='tweets_processed' AND TABLE_TYPE='BASE TABLE')
	DROP TABLE pbist_twitter.tweets_processed;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='tweets_normalized' AND TABLE_TYPE='BASE TABLE')
    DROP TABLE pbist_twitter.tweets_normalized;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='date' AND TABLE_TYPE='BASE TABLE')
    DROP TABLE pbist_twitter.[date];
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='pbist_twitter' AND TABLE_NAME='configuration' AND TABLE_TYPE='BASE TABLE')
    DROP TABLE pbist_twitter.[configuration];



-- Stored procedures
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA='pbist_twitter' AND ROUTINE_NAME='sp_get_replication_counts' AND ROUTINE_TYPE='PROCEDURE')
    DROP PROCEDURE pbist_twitter.sp_get_replication_counts;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA='pbist_twitter' AND ROUTINE_NAME='sp_get_prior_content' AND ROUTINE_TYPE='PROCEDURE')
    DROP PROCEDURE pbist_twitter.sp_get_prior_content;


IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name='pbist_twitter')
BEGIN
    EXEC ('CREATE SCHEMA pbist_twitter AUTHORIZATION dbo'); -- Avoid batch error
END;
