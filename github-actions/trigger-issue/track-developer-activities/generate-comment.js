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
  console.log(context.payload.issue.user)
  const eventName = context.eventName
  const eventAction = context.payload.action
  const number = context.issue.number

  let username; 
  let eventNameString;

  switch(eventName) {
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

  const comment = `${eventNameString} #${number} has been ${eventAction} by @${username}`
  return comment;

}



module.exports = generateComment