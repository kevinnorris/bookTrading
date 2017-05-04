import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

import * as colors from 'utils/colors';

const ModalHeader = styled(Modal.Header)`
  text-align: center;
  background: ${colors.primary};
  color: ${colors.primaryDarker};
`;

const ModalBody = styled(Modal.Body)`
  background: #fafafa;
`;

const ModalFooter = styled(Modal.Footer)`
  background: ${colors.primary};
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
`;

function BookModal({ show, onHide, currentBook, buttonText, buttonAction, ButtonType }) {
  let modalHeader = null;
  let modalBody = null;
  let modalFooter = null;
  if (currentBook) {
    modalHeader = (
      <ModalHeader closeButton>
        <Modal.Title>{currentBook.title}</Modal.Title>
      </ModalHeader>
    );
    modalBody = (
      <ModalBody>
        <InfoWrapper>
          <div>
            {/*<p>
              <b>Title:</b> {currentBook.title}
            </p>*/}
            <p>
              <b>Author(s):</b> {currentBook.authors ? currentBook.authors.join(', ') : ''}
            </p>
            <p>
              <b>Categorie(s):</b> {currentBook.categories ? currentBook.categories.join(', ') : ''}
            </p>
            <p>
              <b>Language:</b> {currentBook.language}
            </p>
            <p>
              <b>Pages:</b> {currentBook.pageCount}
            </p>
            <p>
              <b>Average Rating:</b> {currentBook.averageRating}
            </p>
            <p>
              <b>Rating Count:</b> {currentBook.ratingsCount || 0}
            </p>
          </div>
          <div>
            <a href={currentBook.previewLink} target="blank" rel="noopener noreferrer">
              <img src={currentBook.thumbnail} alt={currentBook.title} />
            </a>
          </div>
        </InfoWrapper>
        <p>
          {currentBook.description}
        </p>
      </ModalBody>
    );
    modalFooter = (
      <ModalFooter>
        <ButtonType onClick={buttonAction}>{buttonText}</ButtonType>
      </ModalFooter>
    );
  }
  return (
    <Modal show={show} onHide={onHide}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </Modal>
  );
}

BookModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onHide: React.PropTypes.func.isRequired,
  currentBook: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]).isRequired,
  buttonText: React.PropTypes.string.isRequired,
  buttonAction: React.PropTypes.func.isRequired,
  ButtonType: React.PropTypes.func.isRequired,
};

export default BookModal;
