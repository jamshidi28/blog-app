import Table from '@/ui/Table'
import { toLocalDateShort } from '@/utils/dateFormatter';
import { toPersianDigits } from '@/utils/numberFormatter';
import truncateText from '@/utils/truncateText';


const typeStyle ={
    free :{
        lable : "رایگان",
        className : "badge--success",
    },
    premium :{
        lable : "پولی",
        className : "badge--secondary",
    },
};

function PostRow({ post, index }) {
    const {title,createdAt,category,author,type } = post;
    return (
        <Table.Row>
            <td>{toPersianDigits(index + 1)}</td>
            <td>{truncateText(title)}</td>
            <td>{category.title}</td>
            <td>{author.name}</td>
            <td>{toLocalDateShort(createdAt)}</td>

            <td>
                <span className={`badge ${typeStyle[type].className}`}>{typeStyle[type].lable}</span>
            </td>

            <td>actions..</td>
        </Table.Row>
    );
}

export default PostRow;
