/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("create", async (context) => {
    const { master_branch, ref_type, ref, repository } = context.payload;

    if (
      repository.name.startsWith("hw-git2-f23-24") &&
      ref_type === "branch" &&
      ref === "main"
    ) {
      console.log(
        `applying config to ${repository.owner.login}/${repository.name}`
      );
      app.log.info(
        `applying config to ${repository.owner.login}/${repository.name}`
      );
      let response = await context.octokit.request(
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
      if (response.status !== 200) {
        app.log.warn(`a request to apply a branch protection rule failed`);
        console.log(`a request to apply a branch protection rule failed`);
      } else {
        app.log.info(`branch protection rule is applied successfully`);
        console.log(`branch protection rule is applied successfully`);
      }
      
    } else {
      app.log.info(
        `skipped ${repository.owner.login}/${repository.name} since it does not match with the conditions`
      );
      console.log(
        `skipped ${repository.owner.login}/${repository.name} since it does not match with the conditions`
      );
    }
  });
};
