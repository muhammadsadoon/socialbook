import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import { DrawerComponentType } from '@/utils/types/components-props';

export default function DrawerToggle({children,isOpen,close,title = "Settings"}:DrawerComponentType & {title?: string}) {
  

  return (
    <>
      <Drawer opened={isOpen} onClose={close} title={title}>
        {children}
      </Drawer>
    </>
  );
}