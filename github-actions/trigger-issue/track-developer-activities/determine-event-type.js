/* 
Determine the contributor generating the event/activity:
- for opened issue events - the issue author
- for assigned, unassigned, and closed issue events- the issue assignee
- for issue_comment 'created` events - the comment author
- for pull_request - the PR author
- for pull_request_review and pull_request_review_comment - the reviewer or comment author 
- Add a comment to the prework issue describing the event/activity
- #[ISSUE # or PR# or link to comment ] has been [ACTIVITY DESCRIPTION] by [REPLACE WITH CONTRIBUTOR GITHUB HANDLE]
*/

async function determineEventType(context) {
  const contributorGithubHandle = context.payload.issue.user.login
  const eventType = context.eventName
  const eventAction = context.payload.action
  const number = context.issue.number

  let username; 

  switch(eventType) {
    case 'issues':
      username = context.payload.issue.user.login;
      break;
    case 'issue_comment':
      console.log(context)
      username = context.payload.comment.user.login;
      break;
    case 'pull_request':
      console.log(context)
      username = context.payload.pull_request.user.login;
      break;
    case 'pull_request_review':
    case 'pull_request_review_comment':
      username = context.payload.review.user.login;
      break;
  }



  const comment = `#${number} has been ${eventAction} by @${contributorGithubHandle}`
  return comment;

}



module.exports = determineEventType