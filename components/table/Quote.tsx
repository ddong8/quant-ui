import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";

interface MyProps {
  taskCode: string;
}

export const QuoteTask: React.FC<MyProps> = ({ taskCode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const code = taskCode.split(".")[1];
  const url = "https://wap.eastmoney.com/quote/stock/115." + code + ".html";
  return (
    <div className="flex flex-col gap-2">
      <Link showAnchorIcon onClick={onOpen} className="text-sm">
        {code}
      </Link>
      <Modal
        size="md"
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div style={{ width: "100%", height: "100vh" }}>
                  <iframe
                    src={url}
                    style={{ border: "none", width: "100%", height: "100%" }}
                    title="Glass Futures"
                  ></iframe>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  关闭
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
