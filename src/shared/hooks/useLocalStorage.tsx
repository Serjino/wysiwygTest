import { useEffect, useState } from "react";

export const useLocalStorage = ({
	key,
	defaultValue,
}: {
	key: string;
	defaultValue?: string;
}) => {
	const [storedData, setStoredData] = useState(
		localStorage.getItem(key) || defaultValue || null
	);
	useEffect(() => {
		localStorage.setItem(key, storedData);
	}, [storedData]);
    
	return {
		storedData,
		setStoredData,
	};
};
