import styled from "styled-components";

export const NatsStreamsAddStyled = styled.div`
  .custom-clientCode-streamName-label {
    position: absolute;
    top: 2.85rem;
    z-index: 999;
    padding: 0rem 0.5rem;
    text-transform: capitalize;
    white-space: nowrap;
    display: inline-block;
    width: 11rem;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    color: var(--placeholder-color);

    &::after {
      content: "";
      border-right: 1.5px solid #919191;
      position: absolute;
      right: 1px;
      height: 1.5rem;
      display: inline-block;
      top: 0px;
    }
  }
  .Addbtn:disabled {
    color: #fff !important;
    background-color: #949494 !important;
    border-color: #949494 !important;
    box-shadow: none !important;
    opacity: 1 !important;
    text-decoration: none !important;
    pointer-events: none !important;
  }
  .Addbtn {
    padding: 6px 26px !important;
  }

  .margin-top-filter {
    margin-top: 2rem !important;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: normal normal normal 24px/29px Montserrat;
    margin-top: 30px;
    border-bottom: 1px solid var(--cecece);
    @media only screen and (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
      #add-nats-streams-btn {
        align-self: flex-end;
        padding-right: 10px;
        @media only screen and (max-width: 576px) {
          padding-right: 0;
        }
      }
    }
    h1 {
      text-align: left;
      font: normal normal normal 30px/37px Montserrat;
      letter-spacing: 0px;
      color: #222328;
      opacity: 1;
      white-space: nowrap;
    }
  }

  .note {
    font-size: 14px;
    line-height: 22px;
    color: #707070;
  }

  .border-top-btnsec {
    border-top: 1px solid var(--cecece);
    padding-top: 2rem;
    margin-bottom: 3rem;
  }
  .age-input {
    margin-top: 0.88rem;
    margin-left: -1px;
    width: 100%;
  }
  .age-dropdown {
    min-width: 178px;
  }
  .max-age {
    display: flex;
    flex-wrap: nowrap;
  }
`;
