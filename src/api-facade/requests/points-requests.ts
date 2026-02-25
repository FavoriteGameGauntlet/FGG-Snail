import type {
	FreePointChangeResultDto,
	PointChange,
	PointChangeResultDto,
	PointInfo,
	TerritoryPointChangeResultDto,
} from '../models'

export type GetPointsInfo = {
	request: {
		path: {
			login: string
		}
	}
	response: PointInfo
}

export type GetPointsAllInfo = {
	response: {
		login: string
		pointInfo: PointInfo
	}[]
}

export type PostTerritoryPoints = {
	request: {
		path: {
			login: string
		}
		body: PointChange
	}
	response: TerritoryPointChangeResultDto[]
}

export type GetTerritoryPoints = {
	request: {
		path: {
			login: string
		}
	}
	response: number
}

export type GetTerritoryPointsHistory = {
	request: {
		path: {
			login: string
		}
	}
	response: TerritoryPointChangeResultDto
}

export type PostFreePoints = {
	request: {
		body: PointChange
	}
	response: FreePointChangeResultDto
}

export type GetFreePoints = {
	response: number
}

export type GetFreePointsHistory = {
	request: {
		path: {
			login: string
		}
	}
	response: FreePointChangeResultDto[]
}

export type PostExperiencePoints = {
	request: {
		body: PointChange
	}
	response: PointChangeResultDto
}

export type GetExperiencePoints = {
	// request: {
	// 	path: {
	// 		login: string
	// 	}
	// }
	response: number
}

export type PostTerritoryHours = {
	request: {
		body: PointChange
	}
	response: PointChangeResultDto
}

export type GetTerritoryHours = {
	// request: {
	// 	path: {
	// 		login: string
	// 	}
	// }
	response: number
}
