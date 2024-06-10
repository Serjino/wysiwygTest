import { useEffect, useState } from "react";

export const useDidMountEffect = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
		setIsMounted(true)
	}, []);

    return isMounted
};