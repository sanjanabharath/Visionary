"use client";

import Image from "next/image";
import { memo } from "react";

import { navElements } from "@/constants";
import { ActiveElement, NavbarProps } from "@/types/type";

import { Button } from "./ui/button";
import ShapesMenu from "./ShapesMenu";
import ActiveUsers from "./users/ActiveUsers";
import { NewThread } from "./comments/NewThread";

const Navbar = ({
  activeElement,
  imageInputRef,
  handleImageUpload,
  handleActiveElement,
}: NavbarProps) => {
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  const startRecord = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: true,
        //@ts-ignore
        preferCurrentTab: true,
      })
      .then((stream): any => {
        const recorder = new MediaRecorder(stream);

        recorder.start();

        const buffer: BlobPart[] | undefined = [];

        recorder.addEventListener("dataavailable", (event) => {
          buffer.push(event.data);
        });

        recorder.addEventListener("stop", () => {
          const blob = new Blob(buffer, {
            type: "video/mp4",
          });

          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "recording.mp4";
          a.click();
        });

        setTimeout(() => {
          recorder.stop();
        }, 100000);
      });
  };

  return (
    <nav className='flex select-none items-center justify-between gap-4 bg-red-900 px-5 text-white'>
      <h2 className='text-xl'>Visionary</h2>

      <ul className='flex flex-row'>
        {navElements.map((item: ActiveElement | any) => (
          <li
            key={item.name}
            onClick={() => {
              if (Array.isArray(item.value)) return;
              handleActiveElement(item);
            }}
            className={`group flex items-center justify-center px-2.5 py-5
            ${isActive(item.value) ? "bg-white" : "hover:bg-white"}
            `}
          >
            {/* If value is an array means it's a nav element with sub options i.e., dropdown */}
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : item?.value === "comments" ? (
              // If value is comments, trigger the NewThread component
              <NewThread>
                <Button className='relative h-5 w-5 object-contain'>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={isActive(item.value) ? "invert" : ""}
                  />
                </Button>
              </NewThread>
            ) : (
              <Button className='relative h-5 w-5 object-contain'>
                {" "}
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={isActive(item.value) ? "invert" : ""}
                />
              </Button>
            )}
          </li>
        ))}

        <button
          onClick={startRecord}
          className='m-4 w-20 rounded-lg border hover:bg-white hover:text-black'
        >
          {" "}
          Start{" "}
        </button>
      </ul>

      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
