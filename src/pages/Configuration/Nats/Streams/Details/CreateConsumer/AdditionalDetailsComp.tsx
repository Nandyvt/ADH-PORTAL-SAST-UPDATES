import React, { useEffect, useRef } from "react";
import { IConsumerStateProps } from "./BasicDetailsComp";

const AdditionalDetailsComp = (props: IConsumerStateProps) => {
  const consumerMaxAckFieldRef = useRef<any>(null);
  const consumerDescFieldRef = useRef<any>(null);

  const handleDescTextAreaChange = (event: any) => {
    props.setInputFieldState((prevState: any) => ({
      ...prevState,
      description: event?.detail,
    }));
  };

  const handleMaxAckNameChange = (event: any) => {
    /* reset max ack pending error obj */
    props.setInputFieldState((prevState: any) => ({
      ...prevState,
      errorObj: {
        ...prevState?.errorObj,
        maxAckPending: "",
      },
    }));
    props.setInputFieldState((prevState: any) => ({
      ...prevState,
      consumerConfig: {
        ...prevState?.consumerConfig,
        maxAckPending: event?.detail,
      },
    }));
  };

  /* Add Event Listeners */
  useEffect(() => {
    consumerDescFieldRef?.current?.addEventListener(
      "auiTextareaChange",
      handleDescTextAreaChange
    );

    consumerMaxAckFieldRef?.current?.addEventListener(
      "auiInputChange",
      handleMaxAckNameChange
    );
    /* cleanup */
    return () => {
      consumerDescFieldRef?.current?.removeEventListener(
        "auiTextareaChange",
        handleDescTextAreaChange
      );
      consumerMaxAckFieldRef?.current?.removeEventListener(
        "auiInputChange",
        handleMaxAckNameChange
      );
    };
  }, []);

  return (
    <div className="row mt-4 pt-4">
      <div className="col-lg-10 d-flex flex-wrap p-0">
        <div className="col-lg-6">
          <aui-textarea
            textareaid="create-consumer-description"
            label="Description"
            direction="column"
            required={false}
            placeholder="Max (255) characters."
            minlength={2}
            maxlength={255}
            ref={consumerDescFieldRef}
          />
        </div>
        <div className="col-lg-6">
          <aui-input
            id="input-create-consumer"
            placeholder="Enter Max Ack Pending Value"
            label="Max Ack Pending"
            direction="column"
            labelgrid="col-sm-3"
            inputgrid="col-sm-9"
            value={1000}
            enablefocus={false}
            errorstate={false}
            required={false}
            errormessage="Should contain only numbers"
            inputid="input-consumer-name"
            ref={consumerMaxAckFieldRef}
          />
          {props.inputFieldState?.errorObj?.maxAckPending && (
            <p className="text-danger">
              {props.inputFieldState?.errorObj?.maxAckPending}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetailsComp;
