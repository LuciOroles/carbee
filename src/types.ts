/**
 * @summary Request body to be sent to /api/auth
 */
export type LoginRequestBody = {
    username: string
    password: string
}


export type LoginFormValues =  LoginRequestBody;

export type LoginResponse = {
    token: string
}

export type HomePageProps = {
    data: {
        token: string
    }
}

export type PageRedirect = {
    destination: string;
    statusCode: number
}

export type PageProps = {
    props: HomePageProps
}


export type WithProps<T> = {
    props: T
}

export type WithRedirect<T> = {
    redirect: T
}

export interface PropsPageManager<T, K> {
    handleSessionToken(token: string | null): WithProps<T> | WithRedirect<K>
}



/**
 * @summary An object representing a user appointment.
 */
export type AppointmentDto = {
    id: string;
    paymentId: string;
    userId: string;
    duration: number;
    scheduledTime: string;
    status: "SCHEDULED" | "PAID" | "COMPLETE" | "IN_PROGRESS";
    workOrder: {
      service: string;
    };
};

/**
 * @summary Base64 string
 */
export type Cursor = string

export type Edge<Node> = {
    node: Node
    cursor: Cursor
}

/**
 * @summary Contains properties relating to pagination.
 */
export type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    previousCursor: Cursor;
    nextCursor: Cursor
}

export type PageIdentifier = Pick<PageInfo, 'nextCursor' | 'previousCursor'>;

export type Connection<Node> = {
    edges: Edge<Node>[]
    pageInfo: PageInfo
}

export type AppointmentEdge = Edge<AppointmentDto>;
export type AppointmentConnection = Connection<AppointmentDto>

export type DateParsableStr = string;
export type AppointmentList = DateParsableStr[];
