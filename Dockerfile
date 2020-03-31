########## Build Stage ##########
FROM ruby:2.6.5-alpine AS yasc-build

RUN  apk update && apk upgrade \
  && apk add --update --no-cache \
    build-base \
    postgresql-dev \
    nodejs \
    yarn \
    tzdata

WORKDIR /usr/src/app

COPY Gemfile* package.json ./

# Install bundler, gems, and node packages
RUN gem update --system && gem install bundler --version 2.1.4 \
  && bundle config --global frozen 1 \
  && bundle config set without 'development:test:assets' \
  && bundle config set deployment 'true' \
  && bundle config set specific_platform x86_64-linux \
  && bundle lock --add-platform x86_64-linux \
  && bundle install -j4 --retry 3 --verbose \
  && yarn install --production

# Remove cached bundler files
RUN rm -rf /usr/local/bundle/cache/*.gem \
  && find /usr/local/bundle/gems/ -name "*.c" -delete \
  && find /usr/local/bundle/gems/ -name "*.o" -delete 

COPY . .

ENV RAILS_ENV=production

# Compile assets
RUN  bundle exec rails assets:precompile \
  && bin/webpack \
  && rm -rf node_modules \
  tmp/cache \
  lib/assets \
  spec

########## Final Stage ##########
FROM ruby:2.6.5-alpine
WORKDIR /usr/src/app
EXPOSE 3000

RUN  apk update && apk upgrade \
  && apk add --update --no-cache \
  postgresql-client nodejs \
  tzdata 

COPY --from=yasc-build /usr/local/bundle /usr/local/bundle
COPY --from=yasc-build /usr/src/app /usr/src/app

RUN mv vendor/bundle/ruby/2.6.0/extensions/x86_64-linux-musl/ vendor/bundle/ruby/2.6.0/extensions/x86_64-linux

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true

RUN bundle config set path vendor/bundler

CMD bundle exec rails s
