import {Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {FaQq} from "react-icons/fa";
import Image from "next/image";
import qqGroupQrcode from "@/public/assets/qq-group-qrcode.jpg";
import qqGroupQrcodeDark from "@/public/assets/qq-group-qrcode-dark.jpg";
import {useTheme} from "next-themes";

export const CardTencent = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [_, setMounted] = useState(false);
  const {theme} = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function getImage() {
    if (theme === 'dark') {
      return qqGroupQrcodeDark;
    } else {
      return qqGroupQrcode;
    }
  }

  return (
    <>
      <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full select-none"
            isPressable
            onPress={() => setShowModal(true)}>
        <CardBody className="py-5">
          <div className="flex gap-2.5">
            <FaQq className='my-auto' size={30}/>
            <div className="flex flex-col">
              <span className="text-default-900">QQ群</span>
              <span className="text-default-900 text-xs">634917584</span>
            </div>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalContent>
          <ModalHeader/>
          <ModalBody>
            <div className='flex' style={{justifyContent: 'center'}}>
              <Image src={getImage()} alt={''}/>
            </div>
          </ModalBody>
          <ModalFooter/>
        </ModalContent>
      </Modal>
    </>
  );
};
