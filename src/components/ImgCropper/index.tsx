import React, { useState, forwardRef, useRef } from 'react'
import Cropper, { ReactCropperProps } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Button, Modal } from 'antd'
import styles from './index.less'

const defaultSrc = '/favicon.png'

interface ImgCropperProps extends ReactCropperProps {}

export const ImgCropper = forwardRef(
  ({ value = defaultSrc, onChange, ...resetProps }: ImgCropperProps, ref) => {
    const cropperRef = useRef(ref)

    const [image, setImage] = useState<any>(value)
    const [cropping, setCropping] = useState()

    const onChoose = (e: any) => {
      e.preventDefault()
      let files
      if (e.dataTransfer) {
        files = e.dataTransfer.files
      } else if (e.target) {
        files = e.target.files
      }
      const reader = new FileReader()
      reader.onload = () => {
        setCropping(reader.result as any)
      }
      reader.readAsDataURL(files[0])
    }

    const getCropData = () => {
      const imageElement: any = cropperRef?.current
      const cropper: any = imageElement?.cropper
      if (typeof cropper !== 'undefined') {
        setImage(cropper.getCroppedCanvas().toDataURL())
        setCropping(null)
        // TODO: onChange
      }
    }

    return (
      <div>
        <div className={styles.cropper}>
          <div className={styles.uploadBtn}>
            <Button type="ghost" icon="upload">
              上传图片
              <input type="file" onChange={onChoose} accept="image/*" />
            </Button>
            &nbsp;&nbsp;
            {image && (
              <Button
                icon="delete"
                type="danger"
                ghost
                size="small"
                onClick={() => setImage(undefined)}
              />
            )}
          </div>
          <Modal
            title="图片剪裁"
            visible={!!cropping}
            okText="剪裁"
            width={800}
            cancelButtonProps={{ style: { display: 'none' } }}
            onOk={getCropData}
            onCancel={() => setCropping(null)}
          >
            <div style={{ height: 500 }}>
              <Cropper
                ref={cropperRef as any}
                // crossOrigin="use-credentials"
                style={{ height: '100%', width: '100%' }}
                zoomTo={0.5}
                // initialAspectRatio={1}
                // preview=".img-preview"
                src={cropping}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                //background={false}
                // responsive={true}
                autoCropArea={1}
                // checkOrientation={false}
                guides={true}
                {...resetProps}
              />
            </div>
            {/* <div
            className="img-preview"
            style={{ width: '100%', float: 'left', height: '300px', overflow: 'hidden' }}
          /> */}
          </Modal>
          {image && (
            <div className={styles.cropContent}>
              <img src={image} alt="" onClick={() => setCropping(image)} />
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default ImgCropper
