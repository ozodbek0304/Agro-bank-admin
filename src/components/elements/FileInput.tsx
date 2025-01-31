import { CircleCheck, FolderOpen } from '@gravity-ui/icons'
import { Button, Icon } from '@gravity-ui/uikit'
import { ChangeEvent, useRef, useState } from 'react'

export default function FileInput(props: any) {

    let fileRef: any = useRef(null)
    const [file, setFile] = useState<any>([])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        props.onChange?.({
            ...event,
            target: {
                ...event.target,
                files: event?.target?.files
            }
        });

        setFile(event?.target?.files)
    }

    return (
        <label>
            <Button
                view={fileRef?.current?.files?.[0] ? 'outlined-success' : 'normal'}
                size="l" width="max"
                className="d-flex align-items-center"
                onClick={() => fileRef.current?.click?.()}

            >
                {file?.[0] ? file?.[0]?.name : props?.label}

                <Icon data={file?.[0] ? CircleCheck : FolderOpen} size={18} />
            </Button>
            <input
                {...props}
                ref={fileRef}
                className={`d-flex align-items-center visually-hidden ${props?.className}`}
                type="file"
                onChange={handleChange}
            />
        </label>
    )
}