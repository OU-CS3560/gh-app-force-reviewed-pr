/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("repository.created", async (context) => {
    const { repository } = context.payload;

    if (repository.name.startsWith("hw6-git2-s22-23")) {
      app.log.info(
        `applying config to ${repository.owner.login}/${repository.name}`
      );
      await context.octokit.request(
        `PUT /repos/${repository.owner.login}/${repository.name}/branches/main/protection`,
        {
          owner: repository.owner.login,
          repo: repository.name,
          branch: "main",
          required_status_checks: null,
          enforce_admins: false,
          restrictions: null,
          required_pull_request_reviews: {
            dismissal_restrictions: {
              users: [],
              teams: [],
              apps: [],
            },
            bypass_pull_request_allowances: {
              users: [],
              teams: ["teaching-assistants"],
              apps: [],
            },
            dismiss_stale_reviews: true,
            require_code_owner_reviews: false,
            required_approving_review_count: 1,
            require_last_push_approval: false,
          },
          required_linear_history: false,
          allow_force_pushes: false,
          allow_deletions: false,
          required_conversation_resolution: false,
          lock_branch: false,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
    }
  });
};
