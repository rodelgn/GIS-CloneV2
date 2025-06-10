import { create } from "zustand";

const usePolygonCoordinatesStore = create((set) => ({
    polygonCoordinates: [],
    setPolygonCoordinates: (newCoordinates) => set({ polygonCoordinates: newCoordinates }),
}));

export const usePolygonCoordinates = () => {
    const polygonCoordinates = usePolygonCoordinatesStore((state) => state.polygonCoordinates);
    const setPolygonCoordinates = usePolygonCoordinatesStore((state) => state.setPolygonCoordinates);

  return {
    polygonCoordinates, setPolygonCoordinates
  };
}