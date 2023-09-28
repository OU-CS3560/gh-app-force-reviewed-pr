# force-reviewed-pr

A GitHub bot that listens to the `create` event of the main branch via a webhook. It then applies
a branch protection rule that force any commit to the `main` branch to be made via a PR.

The framework used is GitHub's Probot. It is currently deployed to Google Cloud Function.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Production Deployment

Create GitHub App. The app must have these permissions

- Reposiotry level: `Read and Write` for `Administration`
- Reposiotry level: `Read` for `Contents`
- Reposiotry level: `Read` for `Metadata` (required by default)
- Organization level: `Read` for `Webhooks`

It must subscribed to the following events

- Create

Once the app is created, make sure it is installed to `OU-CS3560` organization.

Make sure that the `.env.yaml` is up-to-date. The `.env` is for a local development and will not be used during
the deployment.

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

```console
gcloud functions deploy gh-app-force-reviewed-pr-stagging \
        --gen2 \
        --runtime=nodejs18 \
        --region=us-east4 \
        --source=. \
        --entry-point=probotApp \
        --trigger-http \
        --allow-unauthenticated \
        --env-vars-file .env.yaml
```

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
