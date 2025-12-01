import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import { DrawerComponentType } from '@/utils/types/components-props';

export default function DrawerToggle({children,isOpen,close}:DrawerComponentType) {
  

  return (
    <>
      <Drawer opened={isOpen} onClose={close} title="Authentication">
        {children}
      </Drawer>
    </>
  );
}