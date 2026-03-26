import { ReactNode } from "react";
import { Flex } from "./Flex";
import { Icon } from "./Icon";

type Props = {
  icon?: string;
  title: string;
  main?: boolean;
  children?: ReactNode;
};

export function PageHeader({ icon, title, main = false, children }: Props) {
  return (
    <section className="jrc-PageHeader">
      <Flex justify="flex-start" items="center">
        {icon && main && <Icon path={icon} className="jrc-PageHeader__main-icon" />}
        {icon && !main && <Icon path={icon} className="jrc-PageHeader__icon" size="20" />}
        <h1 className={`${main ? "jrc-PageHeader__main-title" : "jrc-PageHeader__title"}`}>{title}</h1>
      </Flex>
      <div className="jrc-PageHeader__children-container">{children}</div>
    </section>
  );
}
