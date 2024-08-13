import React from 'react';
import styles1 from "../ComponentCSS/Popup.module.css";
import { CloseBtn1 } from '../UtilizeComponents/PopUpsU';

export function AttachmentPopup(props) {
    const {
      trigger,
      setTrigger,
      downloadAttachment,
      attachments
    } = props;
    console.log(attachments)
    return (props.trigger) ? (
      <div className = {styles1.viewAttachment}>
          <div className={styles1.viewAttachmentInner}>
  
              <div className={styles1.popupTitle1}>
                <p>Attachments</p>
                <CloseBtn1 btnName = "Close" onClick = {(e) => {
                    e.preventDefault();
                    setTrigger(false);
                }}/>
              </div>
              <div className={styles1.attachmentListWrapper}>
              <div className={styles1.attachmentList}>
                {attachments?.map((attachment) => {
                    return (
                        <SingleAttachment
                        downloadAttachment = {downloadAttachment}
                        attachment = {attachment}
                        />
                    );
                  })
                }
              </div>
              </div>
          </div>
      </div>
    ) : "";
  }

export function SingleAttachment(props) {
    const {
        downloadAttachment,
        attachment
    } = props;
    const {
      originalname
    } = attachment;
    return (
      <div className={styles1.singleAttachement}>
        <span
          className={styles1.attachmentName}
        >
          {originalname}
        </span>
        <button 
            className={styles1.attachmentDownloadButton}
            onClick={(e) => downloadAttachment(e, attachment)}
        >
            Download
        </button>
      </div>
    );
}
  