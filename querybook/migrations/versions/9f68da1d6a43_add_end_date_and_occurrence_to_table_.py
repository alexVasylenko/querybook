"""Add end_date and occurrence to table_schedule table

Revision ID: 9f68da1d6a43
Revises: 8b69979ffc31
Create Date: 2022-04-14 16:16:49.735400

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f68da1d6a43'
down_revision = '8b69979ffc31'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('task_schedule', sa.Column("end_time", sa.DateTime(), nullable=True))
    op.add_column('task_schedule', sa.Column("recurrences", sa.Integer(), nullable=True))



def downgrade():
    op.drop_column('task_schedule', 'end_time')
    op.drop_column('task_schedule', 'recurrences')
