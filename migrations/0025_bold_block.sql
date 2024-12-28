-- Create function to reorder frameworks
CREATE OR REPLACE FUNCTION reorder_frameworks(
  p_framework_id uuid,
  p_new_index integer,
  p_user_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_old_index integer;
  v_max_index integer;
BEGIN
  -- Get the current index
  SELECT order_index INTO v_old_index
  FROM frameworks
  WHERE id = p_framework_id AND user_id = p_user_id;

  -- Get the maximum index
  SELECT COALESCE(MAX(order_index), 0) INTO v_max_index
  FROM frameworks
  WHERE user_id = p_user_id;

  -- Validate new index
  IF p_new_index < 0 THEN
    p_new_index := 0;
  ELSIF p_new_index > v_max_index THEN
    p_new_index := v_max_index;
  END IF;

  -- Update indexes
  IF v_old_index IS NOT NULL THEN
    IF p_new_index > v_old_index THEN
      -- Moving down: update frameworks in between
      UPDATE frameworks
      SET order_index = order_index - 1
      WHERE user_id = p_user_id
        AND order_index > v_old_index
        AND order_index <= p_new_index;
    ELSE
      -- Moving up: update frameworks in between
      UPDATE frameworks
      SET order_index = order_index + 1
      WHERE user_id = p_user_id
        AND order_index >= p_new_index
        AND order_index < v_old_index;
    END IF;

    -- Update the framework itself
    UPDATE frameworks
    SET order_index = p_new_index
    WHERE id = p_framework_id AND user_id = p_user_id;
  END IF;
END;
$$;