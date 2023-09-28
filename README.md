# force-reviewed-pr

> A GitHub App built with [Probot](https://github.com/probot/probot) that A Probot app

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Production Deployment

Make sure that the `.env.yaml` is up-to-date.

```console
gcloud functions deploy gh-app-force-reviewed-pr \
        --gen2 \
        --runtime=nodejs18 \
        --region=us-east4 \
        --source=. \
        --entry-point=probotApp \
        --trigger-http \
        --allow-unauthenticated \
        --env-vars-file .env.yaml
```

## Stagging Deployment

gcloud functions deploy gh-app-force-reviewed-pr-stagging \
        --gen2 \
        --runtime=nodejs18 \
        --region=us-east4 \
        --source=. \
        --entry-point=probotApp \
        --trigger-http \
        --allow-unauthenticated \
        --env-vars-file .env.yaml

## Docker

```sh
# 1. Build container
docker build -t force-reviewed-pr .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> force-reviewed-pr
```

## Contributing

If you have suggestions for how force-reviewed-pr could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2023 OU-CS3560
