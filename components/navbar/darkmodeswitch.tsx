import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { MdSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  return (
      <Switch
          defaultSelected
          size="lg"
          color="secondary"
          thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                  <BsMoonStarsFill className={className} />
              ) : (
                  <MdSunny className={className} />
              )
          }
          isSelected={resolvedTheme === "dark" ? true : false}
            onValueChange={(e) => setTheme(e ? "dark" : "light")}
      >
      </Switch>


  );
};
