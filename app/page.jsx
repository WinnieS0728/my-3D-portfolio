"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import Loader from "./components/loder";
import Island from "../src/models/island";
import Sky from "../src/models/sky";
import Bird from "../src/models/bird";
import Plane from "../src/models/plane";
import { cn } from "@utils/cn";
import HomeInfo from "./components/home info";
import { Footer } from "./components/footer";

export default function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  // const music = useMemo(() => new Audio("/sounds/sakura.mp3"), []);
  // useEffect(() => {
  //   music.play();
  // }, [music]);

  return (
    <>
      <main>
        <section className='w-full h-screen absolute inset-0 -z-10'>
          <div className='absolute top-28 left-0 right-0 z-10 flex justify-center items-center'>
            {currentStage && <HomeInfo currentState={currentStage} />}
          </div>
          <Canvas
            className={cn("w-full h-full cursor-grab", {
              "cursor-grabbing": isRotating,
            })}
            camera={{
              near: 0.1,
              far: 1000,
            }}
          >
            <Suspense fallback={<Loader />}>
              <directionalLight
                position={[1, 1, 1]}
                intensity={2}
              />
              <ambientLight intensity={0.5} />
              <hemisphereLight
                skyColor='#b1e1ff'
                groundColor='#000'
                intensity={0.1}
              />

              <Sky isRotating={isRotating} />
              <Island
                scale={islandScale}
                position={islandPosition}
                rotation={islandRotation}
                isRotating={isRotating}
                setIsRotating={setIsRotating}
                setCurrentStage={setCurrentStage}
              />

              <Bird />
              <Plane
                isRotating={isRotating}
                scale={planeScale}
                position={planePosition}
                rotation={[0, 20, 0]}
              />
            </Suspense>
          </Canvas>
        </section>
      </main>
      <Footer className={"absolute bottom-0"} />
    </>
  );
}

function adjustIslandForScreenSize() {
  let screenScale = null;
  let screenPosition = [0, -10, -40];
  let rotation = [-0.1, 4.7, 0];

  if (typeof window !== "undefined" && window.innerWidth < 768) {
    screenScale = [0.9, 0.9, 0.9];
  } else {
    screenScale = [1, 1, 1];
  }

  return [screenScale, screenPosition, rotation];
}
function adjustPlaneForScreenSize() {
  let screenScale, screenPosition;

  if (typeof window !== "undefined" && window.innerWidth < 768) {
    screenScale = [1.5, 1.5, 1.5];
    screenPosition = [0, -1.5, 0];
  } else {
    screenScale = [3, 3, 3];
    screenPosition = [0, 0.3, -4];
  }

  return [screenScale, screenPosition];
}
