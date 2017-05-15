/* eslint no-underscore-dangle: 0*/
import React from 'react';
import Card from 'components/Card';
import Loader from 'components/Loader';
import RequestListItem from './RequestListItem';

function RequestList({ requests, inProgress, fetching, onClick, deleteButton, buttonLabel, userId }) {
  let requestItems = null;
  if (!fetching) {
    requestItems = requests.map((request, index) => (
      <RequestListItem
        bookTitle={request.title}
        requestDate={request.requestDate}
        name={request.userData.name}
        country={request.userData.country}
        city={request.userData.city}
        zip={request.userData.zip}
        email={request.userData.email}
        accepted={request.accepted}
        key={index}
        onClick={() => onClick({ requestId: request._id, bookId: request.bookId, newOwner: userId })}
        deleteButton={deleteButton}
      />));
  }
  return (
    <Card>
      <RequestListItem
        bookTitle={'Book'}
        requestDate={'Request Date'}
        name={'Name'}
        city={'Location'}
        email={'Email'}
        accepted={inProgress}
        key={'label'}
        isLabel
        buttonLabel={buttonLabel}
      />
      {requestItems || <Loader />}
    </Card>
  );
}

RequestList.propTypes = {
  requests: React.PropTypes.array.isRequired,
  inProgress: React.PropTypes.bool,
  fetching: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  deleteButton: React.PropTypes.bool,
  buttonLabel: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
};

export default RequestList;
