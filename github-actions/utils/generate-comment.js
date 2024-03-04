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

async function generateComment(context) {

  let username; 
  let eventNameString;

  // Based on the event type: 1) determine the github handle of the member generating the event/activity, 2) format the event name for the comment
  switch(context.eventName) {
    case 'issues':
      eventNameString = "Issue"
      username = context.payload.issue.user.login;
      break;
    case 'issue_comment':
      eventNameString = "Issue Comment"
      username = context.payload.comment.user.login;
      break;
    case 'pull_request':
      eventNameString = "Pull Request"
      username = context.payload.pull_request.user.login;
      break;
    case 'pull_request_review':
      eventNameString = "Pull Request Review"
      username = context.payload.review.user.login;
      break;
    case 'pull_request_review_comment':
      eventNameString = "Pull Request Review Comment"
      username = context.payload.review.user.login;
      break;
  }

  return `${eventNameString} #${context.issue.number} has been ${context.payload.action} by @${username}`

}



module.exports = generateComment