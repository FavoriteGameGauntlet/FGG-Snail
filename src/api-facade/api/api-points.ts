import { http } from '../http'
import type {
	GetPointsAllInfo,
	GetPointsInfo,
} from '../requests/points-requests'

export const apiPoints = {
	getPointsInfo: ({ path: { login } }: GetPointsInfo['request']) =>
		http.get<GetPointsInfo>(`/points/${login}/info`).then(({ body }) => body),

	getPointsAllInfo: () =>
		http.get<GetPointsAllInfo>('/points/all/info').then(({ body }) => body),
}
