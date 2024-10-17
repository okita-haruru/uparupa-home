import React, {useEffect, useState} from "react";
import {useTheme as useNextTheme} from "next-themes";
import {Switch} from "@nextui-org/react";
import {MdSunny} from "react-icons/md";
import {BsMoonStarsFill} from "react-icons/bs";

export const DarkModeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const {setTheme, resolvedTheme} = useNextTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <Switch size={"lg"} thumbIcon={() => <MdSunny/>}/>;

  return (
    <Switch
      defaultSelected
      size="lg"
      color="secondary"
      thumbIcon={({isSelected, className}) =>
        isSelected ? (
          <BsMoonStarsFill className={className}/>
        ) : (
          <MdSunny className={className}/>
        )
      }
      isSelected={resolvedTheme === "dark"}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
    />
  );
};
