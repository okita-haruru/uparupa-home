import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Dropdown, DropdownTrigger, NavbarItem, DropdownMenu, DropdownSection, DropdownItem
} from "@nextui-org/react";
import { AiOutlineBilibili } from "react-icons/ai";
import { GiPenguin } from "react-icons/gi";
import {SupportIcon} from "@/components/icons/navbar/support-icon";


export const ContentBox = () => {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <NavbarItem>
                    <SupportIcon />
                </NavbarItem>
            </DropdownTrigger>
            <DropdownMenu className="w-80" aria-label="Avatar Actions">
                <DropdownSection title="加入我们">
                    <DropdownItem
                        classNames={{
                            base: "py-2",
                            title: "text-base font-semibold",
                        }}
                        key="1"
                        description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
                    >
                        <GiPenguin /> Edit your information
                    </DropdownItem>
                    <DropdownItem
                        key="2"
                        classNames={{
                            base: "py-2",
                            title: "text-base font-semibold",
                        }}
                        description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
                    >
                        <AiOutlineBilibili />Say goodbye to paper receipts!
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};
