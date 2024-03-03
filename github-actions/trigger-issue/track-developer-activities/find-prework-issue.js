// Import modules

// Global variables
var github;
var context;

async function main({ g, c }) {
  github = g;
  context = c;
  
  // Get issue author
  // const issueAuthor = context.payload.issue.user.login
  
  // Get the Prework issue assigned to the issue author
  const preworkIssue = await github.rest.issues.listForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    creator: "JackCasica",
    labels: 'Complexity: Prework',
  });

  // Return the prework issue
  return preworkIssue.data[0]

}

module.exports = main