SET ANSI_NULLS              ON;
SET ANSI_PADDING            ON;
SET ANSI_WARNINGS           ON;
SET ANSI_NULL_DFLT_ON       ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET QUOTED_IDENTIFIER       ON;
go


CREATE TABLE pbist_twitter.[configuration]
(
  id                     INT IDENTITY(1, 1) NOT NULL,
  configuration_group    VARCHAR(150) NOT NULL,
  configuration_subgroup VARCHAR(150) NOT NULL,
  name                   VARCHAR(150) NOT NULL,
  [value]                VARCHAR(max) NULL,
  visible                BIT NOT NULL DEFAULT 0
);


CREATE TABLE pbist_twitter.tweets_processed
(
    tweetid          NCHAR(20) NOT NULL PRIMARY KEY,
    dateorig         DATETIME,
    hourofdate       DATETIME,
    minuteofdate     DATETIME,
    latitude         FLOAT,
    longitude        FLOAT,
    masterid         NCHAR(25),-- UNIQUE NOT NULL,
    retweet          NCHAR(6),
    username         NCHAR(100),
    usernumber       NCHAR(100),
    image_url        NCHAR(200),
    authorimage_url  NCHAR(200),
    direction        NCHAR(20),
    favorited        INT,
    user_followers   INT,
    user_friends     INT,
    user_favorites   INT,
    user_totaltweets INT
);


CREATE TABLE pbist_twitter.tweets_normalized
(
    masterid        NCHAR(25) NOT NULL PRIMARY KEY,-- foreign key references tweets_processed(masterid),
    mentions        INT,
    hashtags        INT,
    tweet           NCHAR(200),
    twitterhandle   NCHAR(100),
    usernumber      NCHAR(100),
    sentiment       FLOAT,
    sentimentbin    FLOAT,
    sentimentposneg NCHAR(10),
    lang            NCHAR(4),
    accounttag      NCHAR(25)
);
ALTER TABLE pbist_twitter.tweets_processed ADD CONSTRAINT ck_masteridconst FOREIGN KEY (masterid) REFERENCES pbist_twitter.tweets_normalized(masterid);


CREATE TABLE pbist_twitter.hashtag_slicer
(
    tweetid NCHAR(20),
    facet   NCHAR(200)
);
ALTER TABLE pbist_twitter.hashtag_slicer ADD CONSTRAINT ck_tweethashtag FOREIGN KEY(tweetid) REFERENCES pbist_twitter.tweets_processed(tweetid);


CREATE TABLE pbist_twitter.mention_slicer
(
    tweetid NCHAR(20),
    facet   NCHAR(200)
);
ALTER TABLE pbist_twitter.mention_slicer ADD CONSTRAINT ck_tweetmention FOREIGN KEY(tweetid) REFERENCES pbist_twitter.tweets_processed(tweetid);


CREATE TABLE pbist_twitter.authorhashtag_graph
(
    tweetid      NCHAR(20),
    author       NCHAR(200),
    authorcolor  NCHAR(10),
    hashtag      NCHAR(200),
    hashtagcolor NCHAR(10)
);
ALTER TABLE pbist_twitter.authorhashtag_graph ADD CONSTRAINT ck_tweetauthor FOREIGN KEY(tweetid) REFERENCES pbist_twitter.tweets_processed(tweetid);

CREATE TABLE pbist_twitter.authormention_graph
(
    tweetid      NCHAR(20),
    author       NCHAR(200),
    authorcolor  NCHAR(10),
    mention      NCHAR(200),
    mentioncolor NCHAR(10)
);
ALTER TABLE pbist_twitter.authormention_graph ADD CONSTRAINT ck_tweetmentiongraph FOREIGN KEY(tweetid) REFERENCES pbist_twitter.tweets_processed(tweetid);

