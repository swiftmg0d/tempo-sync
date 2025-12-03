import camelcase from 'camelcase';

export const convertToCamelCase = <T, M = T>(object: T): M => {
	if (object === null || object === undefined) return object as unknown as M;

	if (typeof object !== 'object') return object as M;

	if (Array.isArray(object)) {
		return object.map((item) => convertToCamelCase(item)) as M;
	}

	const camelCaseObject: Record<string, unknown> = {};

	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			const camelKey = camelcase(key);
			camelCaseObject[camelKey] = convertToCamelCase((object as Record<string, unknown>)[key]);
		}
	}

	return camelCaseObject as M;
};
