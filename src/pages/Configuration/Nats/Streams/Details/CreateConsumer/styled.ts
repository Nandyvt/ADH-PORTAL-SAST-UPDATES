import styled from "styled-components";

export const CreateConsumerStyles = styled.div`
  .heading {
    h2 {
      font-size: 1.125rem;
    }
  }
  h2.heading {
    font-size: 1.125rem;
  }

  .custom-prepopulate-label {
    font-size: 14px;
    position: absolute;
    top: 2.85rem;
    z-index: 99;
    padding: 0rem 0.5rem;
    text-transform: capitalize;
    white-space: nowrap;
    display: inline-block;
    width: 11rem;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    color: var(--primary-black);

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

  .border-top-btnsec {
    border-top: 1px solid var(--cecece);
    padding-top: 2rem;
    margin-bottom: 3rem;
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

  .consumer-name-wrapper {
    top: 14px;
    left: -2px;
  }
`;

export const SubscriptionStyles = styled.div`
  .dropdown {
    position: relative;
    display: inline-block;
    border: 1px solid #919191;
    border-radius: 2px;
    width: 100%;
    cursor: pointer;
    height: 2.5rem;

    > .dropdown-menu {
      > li.dropdown-submenu {
        /* margin-top: 1.25rem; */
        padding: 0.2rem 0.75rem;
        padding-top: 12px;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }

  .dropdown-toggle {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;

    .icon-wrapper {
      position: absolute;
      right: 9px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background-color: rgb(237, 237, 237);
      width: 2.375rem;
      max-height: 2.5rem;
      right: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0px;
      bottom: 0px;
      transition: 0.5s;
    }
    &::after {
      content: none;
    }
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    list-style-type: none;
    padding: 1rem;
    padding-bottom: 0;

    input[type="checkbox"] {
      position: absolute;
      left: 0px;
      width: 1.375rem;
      height: 1.375rem;
      z-index: 5;
      margin: 0px;
      background: transparent;
      color: transparent;
      appearance: none;
      cursor: pointer;

      &:focus {
        width: 1.1rem !important;
        height: 1rem !important;
        top: 3px;
      }
    }

    input[type="checkbox"] + label {
      &::before {
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(145, 145, 145);
        border-radius: 2px;
        cursor: pointer;
        width: 1.1rem;
        height: 1.1rem;
        left: 0px;
        position: absolute;
        top: 3px;
        content: "";
      }

      &::after {
        border-bottom: 2px solid rgb(255, 255, 255);
        border-left: 2px solid rgb(255, 255, 255);
        border-image: initial;
        border-top: none;
        border-right: none;
        content: "";
        height: 0.375rem;
        position: absolute;
        top: 0.4rem;
        left: 0.2rem;
        transform: rotate(-45deg);
        width: 0.75rem;
      }
    }

    input[type="checkbox"]:checked + label {
      &::after {
        border-color: rgb(193, 14, 33);
      }
    }

    .dropdown-input-label {
      padding-left: 1.75rem;
    }
  }

  .dropdown-menu a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-menu a:hover {
    background-color: #f1f1f1;
  }

  .dropdown-submenu .dropdown-input-label,
  .dropdown-submenu .dropdown-item-wrapper {
    position: relative;
  }

  .dropdown-submenu .dropdown-item-wrapper {
    /* border: 1px solid red; */
  }

  .dropdown-submenu .dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -1px;
    display: flex !important;
    min-height: 9rem;
    flex-wrap: wrap;
  }

  .dropdown-menu.source-dropdown-wrapper {
    width: 40%;
    padding-left: 0;
    max-height: 10rem;
    overflow-y: auto;

    li.dropdown-submenu.open {
      background: #ebebeb;
    }

    li.dropdown-submenu:first-child {
      cursor: default;
      &:focus {
        box-shadow: none !important;
        outline: 0 !important;
      }
    }
  }

  .dropdown-menu.entity-dropdown-wrapper {
    position: absolute;
    top: 2.5rem;
    left: 40%;
    width: 60%;
    max-width: 64%;
    display: flex !important;
    flex-wrap: wrap;
    box-shadow: none;
    height: 10rem;
    overflow-y: auto;
    border-radius: 0;
    justify-content: space-between;
    /*     border: 0 solid transparent;
    border-left: 1px solid #00000026; */

    li.dropdown-submenu {
      margin-bottom: 0.75rem;
      flex: 1 1 50%;
    }
  }

  .dropdown-submenu.open > .dropdown-menu {
    display: block;
  }

  .caret {
    margin-left: 5px;
  }

  .dropdown-input {
    display: none;
  }

  .dropdown-input:checked + .dropdown-menu {
    display: block;
  }

  .selected-labels {
    margin-top: 10px;
    height: 8rem;
    margin-bottom: 2.75rem;
    overflow-y: auto;
    border: 1px solid grey;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;

    .selected-label {
      display: inline-block;
      padding: 5px 10px;
      background-color: #f2f2f2;
      margin: 8px;
      border-radius: 3px;
      color: #222328;

      .btn.btn-link-style {
        padding: 0 0.5rem !important;
        top: -2px;
        position: relative;
        left: 4px;
      }
    }
  }

  .selected-label button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 5px;
    color: #007bff;
  }

  .selected-label button:hover {
    text-decoration: underline;
  }

  .arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000; /* Arrow color */
    margin-left: 5px;
  }

  .chip-wrapper {
    margin: 0;
    background-color: rgba(193, 14, 33, 0.1);
    color: rgb(181, 11, 28);
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    padding-right: 0;
    max-width: 40%;
    gap: 0.25rem;
    top: -3px;
    position: relative;

    .btn.btn-link-style {
      color: #c10e21;
      background-color: transparent;
      border: 2px solid transparent;
      padding: 0 0.75rem 0 0 !important;
      line-height: 1;
      margin: 0;
      text-decoration: underline;
      border-radius: 0;
    }

    .chip {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #c10e21;
      padding-inline: 0.5rem;
      background: transparent;
      border: none;
    }
  }

  .aui-arrow-right-wrapper {
    position: absolute;
    left: 90%;
    top: -2px;
  }

  .subs-heading {
    &::after {
      content: "*";
      color: rgb(255, 0, 0);
      margin-left: 0.125rem;
    }
  }

  .subs-label-placeholder {
    font-weight: normal !important;
  }
`;
