import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { ERROR_MESSAGE } from '../constants';

/**
 *
 * @param data - Data to upload to arweave
 * @returns arweave transaction id
 */
const uploadToArweave = async (data: any): Promise<string> => {
  const toast = useToast()

  try {
    const upload = await axios('/api/metadata/upload', {
      method: 'POST',
      data
    });

    const { id }: { id: string } = upload?.data;

    return id;
  } catch {
    toast({
      title: 'Error',
      description: ERROR_MESSAGE,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
    throw new Error(ERROR_MESSAGE);
  }
};

export default uploadToArweave;
