import React, { useState, useEffect } from "react";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function MenuComponent({ modifyfunc, deletefunc }: any) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <>
      <Menu visible={visible} onDismiss={closeMenu} anchor={<SimpleLineIcons name="options-vertical" size={15} color="black" onPress={openMenu} />}>
        <Menu.Item onPress={modifyfunc} title="수정" />
        <Menu.Item onPress={deletefunc} title="삭제" />
      </Menu>
    </>
  );
}
