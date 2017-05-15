import React from 'react';
import Card from 'components/Card';
import RequestListItem from './RequestListItem';

function RequestList({ requests, inProgress }) {
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
      />
      {requests.map((request, index) => (
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
        />))}
    </Card>
  );
}

RequestList.propTypes = {
  requests: React.PropTypes.array.isRequired,
  inProgress: React.PropTypes.bool,
};

export default RequestList;
