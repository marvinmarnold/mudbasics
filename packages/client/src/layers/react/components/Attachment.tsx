// import { Spinner } from '@components/UI/Spinner';
// import { Tooltip } from '@components/UI/Tooltip';
// import useOnClickOutside from '@components/utils/hooks/useOnClickOutside';
// import type { LensterAttachment } from '@generated/lenstertypes';
// import { Menu, Transition } from '@headlessui/react';
import { MusicNoteIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import type { ChangeEvent, Dispatch, FC } from 'react';
import { Fragment, useId, useRef, useState } from 'react';
import toast from 'react-hot-toast';
// import { PUBLICATION } from 'src/tracking';

import { Leafwatch } from '../../../lib/leafwatch';
import uploadToIPFS from '../../../lib/uploadToIPFS';
import {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_MEDIA_TYPES,
  ALLOWED_VIDEO_TYPES
} from 'src/constants';
interface Props {
  attachments: unknown; // LensterAttachment[];
  setAttachments: unknown; // Dispatch<LensterAttachment[]>;
}

const Attachment: FC<Props> = ({ attachments, setAttachments }) => {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const id = useId();
  const dropdownRef = useRef(null);

  // useOnClickOutside(dropdownRef, () => setShowMenu(false));

  const hasVideos = (files: any) => {
    let videos = 0;
    let images = 0;

    for (const file of files) {
      if (ALLOWED_VIDEO_TYPES.includes(file.type)) {
        videos = videos + 1;
      } else {
        images = images + 1;
      }
    }

    if (videos > 0) {
      if (videos > 1) {
        return true;
      }

      return images > 0 ? true : false;
    }

    return false;
  };

  const isTypeAllowed = (files: any) => {
    for (const file of files) {
      if (ALLOWED_MEDIA_TYPES.includes(file.type)) {
        return true;
      }
    }

    return false;
  };

  const handleAttachment = async (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setShowMenu(false);
    setLoading(true);

    try {
      // Count check
      if (evt.target.files && (hasVideos(evt.target.files) || evt.target.files.length > 4)) {
        return toast.error('Please choose either 1 video or up to 4 photos.');
      }

      // Type check
      if (isTypeAllowed(evt.target.files)) {
        const attachment = await uploadToIPFS(evt.target.files);
        if (attachment) {
          setAttachments(attachment);
          evt.target.value = '';
        }
      } else {
        return toast.error('File format not allowed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

    <MusicNoteIcon className="w-4 h-4 text-brand" />
    <span className="text-sm">Upload audio</span>
    <input
      id={`audio_${id}`}
      type="file"
      accept={ALLOWED_AUDIO_TYPES.join(',')}
      className="hidden"
      // onClick={() => Leafwatch.track(PUBLICATION.NEW.ATTACHMENT.UPLOAD_AUDIO)}
      onChange={handleAttachment}
      disabled={attachments.length >= 4}
      />
      </div>
  );
};

export default Attachment;
