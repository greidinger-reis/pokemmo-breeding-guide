type MapObserver<T> = (map: Map<string, T>) => void;

interface ObservedMap<T> extends Map<string, T> {
	addObserver: (observer: MapObserver<T>) => void;
	removeObserver: (observer: MapObserver<T>) => void;
}

const mapListeners = new WeakMap<Map<any, any>, { proxy: ObservedMap<any>, listeners: Set<MapObserver<any>> }>();

function observeMap<T>(map: Map<string, T>): ObservedMap<T> {
	if (!mapListeners.has(map)) {
		const listeners = new Set<MapObserver<T>>();

		const notifyListeners = () => {
			listeners.forEach(listener => listener(map));
		};

		const mapProxy = new Proxy(map, {
			set(target, property, value, receiver) {
				target.set(property, value);
				notifyListeners();
				return true;
			},
			deleteProperty(target, property) {
				target.delete(property);
				notifyListeners();
				return true;
			},
		});

		const observedMap: ObservedMap<T> = mapProxy as ObservedMap<T>;
		observedMap.addObserver = (observer: MapObserver<T>) => listeners.add(observer);
		observedMap.removeObserver = (observer: MapObserver<T>) => listeners.delete(observer);

		mapListeners.set(map, { proxy: observedMap, listeners });
	}

	return mapListeners.get(map).proxy;
}

// Example usage
const myMap = new Map<string, string>();

const observedMap = observeMap(myMap);

const observerCallback: MapObserver<string> = (map) => {
	console.log('Map has changed:', map);
};

observedMap.addObserver(observerCallback);

observedMap.set('key1', 'value1');
observedMap.set('key2', 'value2');
observedMap.delete('key1');

// Remove observer
observedMap.removeObserver(observerCallback);

observedMap.set('key3', 'value3');
