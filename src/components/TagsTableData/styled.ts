import styled from "styled-components";

const TagsTableDataStyles = styled.div`
  .roleColumnWrapper {
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;

    .roleStylesMin {
      padding: 3px 5px;
      max-width: 100%;
      width: auto;
      margin: 5px 0;
      text-align: left;
      margin-right: 0.625rem;
      border-radius: 4px;
      > p {
        font-size: 12px;
        margin-bottom: 0;
        line-height: 1.5;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p.highlightDep {
        letter-spacing: 0px;
        color: #c10e21;
        font-size: 10px;
      }
      .helpTextStyles {
        padding-left: 3px;
        margin-top: -1px;
        cursor: pointer;
      }
      .helpTextStylesImg {
        width: 14px;
        margin-right: 4px;
      }
    }
    .roleStylesMin.roleColorCodeSA {
      background: var(--superAdmin-superUser-bgColor);
      > p {
        color: var(--superAdmin-superUser-color);
      }
    }

    .roleStylesMin.roleColorCodeCPU {
      background-color: var(--clientAdmin-bgColor);

      > p {
        color: var(--clientAdmin-color);
      }
    }

    .roleStylesMin.roleColorCodeEU {
      background-color: var(--endUser-bgColor);

      > p {
        color: var(--endUser-color);
      }
    }

    .roleStylesMin.roleColorCodeINACTIVE {
      position: relative;
      background-color: #7070701a;
    }

    .circleSec {
      width: auto;
      .circleWrapper {
        height: 25px;
        /* width: 30px; */
        background: #c10e21 0% 0% no-repeat padding-box;
        border: 1px solid #c10e21;
        border-radius: 2px;
        color: #fff;
        font-size: 12px;
        display: flex;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 4;
      }

      .circleWrapper:hover::before {
        content: "View More Subscriptions";
        display: block;
        width: 7.5rem;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        top: -4rem;
      }

      .circleWrapper.popover-open:hover::before,
      .circleWrapper.popover-open:hover::after {
        content: none;
      }
      .z-index-6 {
        z-index: 6;
      }

      .circleWrapper:hover::after {
        content: "";
        position: absolute;
        top: -10px;
        left: 50%;
        margin-left: -5px;
        border-width: 7px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }

      .roleSec {
        position: absolute;
        width: auto;
        background: #fff;
        padding: 0.75rem 0rem;
        padding-bottom: 0;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #e3e3e3;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        z-index: 5;
        padding: 0.625rem;
        padding-top: 2.5rem;
        padding-bottom: 5px;
        @media screen and (min-width: 320px) and (max-width: 991px) {
          width: 15rem;
        }
        .roleStylesMin {
          display: inline-block;
        }
        > p {
          border-bottom: 1px solid #e6e6e6;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          padding-bottom: 6px;
          line-height: 20px;
          &:last-child {
            border: none;
            padding-bottom: 0;
          }
        }
      }
    }
  }
`;

export default TagsTableDataStyles;
