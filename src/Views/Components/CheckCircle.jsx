import { CheckIcon } from '@heroicons/react/24/solid'

export const CheckCircle = ({ status = false, size = 24 }) => {
    return (
        <div
            className={`flex items-center justify-center rounded-full border-2 border-[#B13BFF] `}
            style={{ width: size, height: size }}
        >
            {status && <CheckIcon className="w-4 h-4 text-[#B13BFF] text-bold" />}
        </div>
    )
}
