import React, {useCallback, useState} from 'react'
import { observer } from "mobx-react-lite";
import {useDropzone} from 'react-dropzone'
import {utils} from "ethers";
import crypto from "crypto";
import { Box } from '@chakra-ui/react'

import {uploadFiles} from '../../../../lib/uploadFiles';
import Attachment from '../../components/Attachment'
import styles from './stylesDesktop.module.css'

export const DesktopWindow: React.FC = observer(({layers}) => {
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false)
  
  const DropZone = () => {
    const onDrop = useCallback(async acceptedFiles => {
      // TODO: 
      const publicationContent = {
        audio: acceptedFiles[0]
      }
      const uploadResponse = await uploadFiles(attachments, publicationContent, setIsUploading);
      // const metadata = await client.store({
      //   name: 'Beat',
      //   description: 'Metadata!',
      //   image: acceptedFiles[0]
      // })
      const id = crypto.randomBytes(32).toString('hex');
      const pk = "0x"+id;
      const entitiId = utils.computeAddress(pk);
      console.log("🚀 ~ file: DesktopWindow.tsx ~ line 26 ~ onDrop ~ entitiId, metadata.ipnft", entitiId, metadata.ipnft)
      layers.network.api.uploadSound(entitiId, metadata.ipnft)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    
  return (
    <div {...getRootProps()}  >
      <input {...getInputProps()} /> 
      
      <div className={styles.dropzone}>
      {
        isDragActive ?
          <p>Drop the music files here ...</p> :
          <p>Drag 'n' drop some music files here</p>
        }
    </div>
    </div>
  )
}

return (  
    <Box width="100%" height="100%" className={styles.desktop}>
      <div className={styles.content}>
        <img src="/img/eruwhite.png" />
        <Box mt={60} fontSize='2em'>Upload Beats</Box>
        {/* <DropZone /> */}
        <Attachment attachments={attachments} setAttachments={setAttachments} />
        <h5>(Use mobile for remixing)</h5>
        {/* TODO: Copy link to share */}
        {/* <a>Copy</a> */}
      </div>
    </Box>
  )
});