import styled from "styled-components";

const StreamDetailsStyles = styled.div`
  .details-container {
    max-width: 600px;
    margin: 0 auto;
  }

  #consumers-tab.aui-tab-content {
    padding-top: 5px;
  }
`;

export default StreamDetailsStyles;

export const NatsConsumerListingStyles = styled.div`
  .show-results-btn-wrapper {
    justify-content: flex-end;
    align-items: center;
    margin-top: 2rem;
  }

  #clear-filter-desktop {
    .btn-link-style {
      padding-right: 0 !important;
      margin-left: 2rem;
    }
  }

  th.subscription-header {
    width: 28%;
  }

  .reload-btn {
    margin-top: 1rem;
    padding: 8px 30px;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .no-data-title {
    font-size: 1.25rem;
    color: var(--noconsumer-textclr);
  }
`;

export const DetailsCompStyles = styled.div`
  .details * {
    user-select: text;
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem 1rem;
    margin-top: 10px;

    .detail-item {
      flex: 0 0 30%;
      display: flex;
      flex-direction: column;

      strong {
        font-weight: 500;
      }

      span {
        margin-top: 5px;
        word-break: break-all;
      }
    }

    @media (max-width: 600px) {
      .detail-item {
        flex: 1 1 100%;
      }
    }
  }

  .editor-title-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #e3e3e3;
    padding: 1rem 1.5rem;
  }
  .editor-title {
    font: normal normal 600 18px/27px Montserrat;
    color: #222328;
  }
  .editor-wrapper {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e3e3e3;
    padding-left: 1.5rem;
    pointer-events: auto !important;
    height: 20rem;
    overflow-y: auto;
  }
  .editor-wrapper * {
    font: normal normal normal 16px/27px Montserrat !important;
  }

  .active-btn {
    background: #c10e21 0% 0% no-repeat padding-box;
    border: 2px solid #c10e21;
    color: white;
  }
  .json-buttons {
    padding: 0.5rem 1.75rem;
  }

  .btn.btn-primary {
    padding: 0.5rem 2rem;
  }
`;
