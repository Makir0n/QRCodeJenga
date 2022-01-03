import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { AiTwotoneSetting } from "react-icons/ai";

export type Setting = {
  disableEditWhiteCell: boolean;
};

export const SettingDrawer = ({
  setting,
  onChangeSetting,
}: {
  setting: Setting;
  onChangeSetting: (partialSetting: Partial<Setting>) => void;
}) => {
  /**
   * Notify setting change to parent component
   */
  const handleChangeDisableEditWhiteCell = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeSetting({
      disableEditWhiteCell: event.target.checked,
    });
  };
  /**
   * Drawer
   */
  const {
    isOpen: isOpenSettingDrawer,
    onOpen: onOpenSettingDrawer,
    onClose: onCloseSettingDrawer,
  } = useDisclosure();
  return (
    <React.Fragment>
      <Button onClick={onOpenSettingDrawer} size="sm" mb="10px">
        <AiTwotoneSetting />
      </Button>
      <Drawer
        placement="left"
        onClose={onCloseSettingDrawer}
        isOpen={isOpenSettingDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">設定</DrawerHeader>
          <DrawerBody>
            <FormControl size="xs" display="flex">
              <FormLabel htmlFor="disable-edit-while-cell">
                白マスは反転不可にする
              </FormLabel>
              <Switch
                id="disable-edit-while-cell"
                isChecked={setting.disableEditWhiteCell}
                onChange={handleChangeDisableEditWhiteCell}
              />
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};
