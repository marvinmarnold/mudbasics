import React, {useCallback, useState} from 'react'
import { observer } from "mobx-react-lite";
import {useDropzone} from 'react-dropzone'
import {utils} from "ethers";
import crypto from "crypto";


import {uploadFiles} from '../../../../lib/uploadFiles';
import styles from './stylesDesktop.module.css'

export const DesktopWindow: React.FC = observer(({layers}) => {
  
  const DropZone = () => {
    const [isUploading, setIsUploading] = useState(false)

    const onDrop = useCallback(async acceptedFiles => {
      // TODO: 
      const publicationContent = {
        audio: acceptedFiles[0]
      }
      const uploadResponse = await uploadFiles(publicationContent);
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
    <div className={styles.desktop}>  
        <div className={styles.content}>
        <img src="/img/eruwhite.png" />
        <h1>Upload Beats</h1>
        <DropZone />
        <h3>Use mobile for remixing</h3>
        {/* TODO: Copy link to share */}
        {/* <a>Copy</a> */}
      </div>
    </div>
  )
});